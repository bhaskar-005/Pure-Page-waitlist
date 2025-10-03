import { BookOpen, Twitter, Instagram, Mail } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const socialIcons = [
    { icon: Twitter, href: "https://x.com/bhaskar_builds", label: "Twitter" },
    // { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Mail, href: "mailto:purepage.ai@gmail.com", label: "Email" }
  ]

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 via-gray-100 to-white text-gray-300 border-t border-blue-700/10 shadow-md overflow-hidden">
      {/* Glow accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <motion.div 
          className="grid md:grid-cols-4 gap-12 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Brand */}
          <div className="space-y-4">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/30">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-blue-900">Pure Page</span>
            </motion.div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              AI-powered journaling to help you reflect, grow, and write beautifully.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: [
                { name: "Features", href: "#features" },
                { name: "Waitlist", href: "#waitlist" },
                { name: "Pricing (Coming Soon)", href: "#", disabled: true }
              ]
            },
            {
              title: "Company",
              links: [
                { name: "About (Coming Soon)", href: "#", disabled: true },
                { name: "Blog (Coming Soon)", href: "#", disabled: true },
                { name: "Careers (Coming Soon)", href: "#", disabled: true }
              ]
            }
          ].map((section, sectionIndex) => (
            <div key={section.title}>
              <h3 className="font-semibold text-blue-900 mb-4">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={link.name}>
                    {link.disabled ? (
                      <span className="text-slate-400 cursor-not-allowed">{link.name}</span>
                    ) : (
                      <motion.a 
                        href={link.href} 
                        className="hover:text-blue-900 text-slate-800 transition-colors inline-block"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {link.name}
                      </motion.a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Socials */}
          <div>
            <h3 className="font-semibold text-blue-900 mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center hover:bg-blue-600 text-slate-800 hover:text-white transition-all duration-300 border border-black/10"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-white/10 pt-8 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>
            © {new Date().getFullYear()} <span className="text-blue-900">Pure Page</span>.  
            Built for thoughtful writers.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
