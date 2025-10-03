"use client"
import { useState } from "react"
import { ArrowRight, CheckCircle, Mail, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"

export function Waitlist() {
  const [email, setEmail] = useState("")
  const [note, setNote] = useState("")
  const [showNote, setShowNote] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    setError("")

    try {
      await axios.post("/api/waitlist", { email, note })
      setIsSubmitted(true)
    } catch (err: any) {
      console.error(err)
      setError(err?.response?.data?.error || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="waitlist" className="relative pt-40 pb-44 px-6 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-blue-200/40 rounded-full blur-3xl top-10 left-1/4" />
        <div className="absolute w-96 h-96 bg-purple-200/30 rounded-full blur-3xl bottom-20 right-1/4" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.h2 
          className="text-3xl lg:text-4xl font-semibold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Be the first to experience{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Pure Page
          </span>
        </motion.h2>

        <motion.p 
          className="text-lg text-gray-500 mb-12 font-normal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join our waitlist for early access, exclusive updates, and a launch discount.
        </motion.p>

        <motion.div 
          className={`${isSubmitted ? "bg-green-300/20" : "bg-white/80"} backdrop-blur-xl border border-gray-200 shadow-sm rounded-2xl p-6`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {isSubmitted ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">🎉 You're on the list!</h3>
              <p className="text-green-800">We'll keep you updated as launch gets closer.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800 placeholder-gray-400"
                    disabled={isLoading}
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
                <motion.button
                  type="submit"
                  className="relative px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg hover:shadow-xl transition flex items-center justify-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2 animate-pulse">
                      Sending...
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center gap-2">
                      Join
                      <motion.div
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </span>
                  )}
                </motion.button>
              </div>

              <button
                type="button"
                onClick={() => setShowNote(!showNote)}
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <MessageSquare className="w-4 h-4" />
                {showNote ? "Hide note" : "Add a note (optional)"}
              </button>

              <AnimatePresence>
                {showNote && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Anything you'd like to share with us? (optional)"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800 placeholder-gray-400"
                      disabled={isLoading}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
