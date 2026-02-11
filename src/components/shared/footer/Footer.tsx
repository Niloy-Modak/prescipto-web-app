import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-gray-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-10">
        {/* Top section */}
        <div className="grid gap-14 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/logo/logo.png"
                alt="Prescripto Logo"
                width={52}
                height={52}
                className="rounded-md"
              />
              <h2 className="text-xl font-semibold text-white">Prescripto</h2>
            </div>

            <p className="text-sm leading-6 text-white max-w-md">
              Prescripto is a modern healthcare platform that simplifies
              appointments, prescriptions, and patient management with a
              seamless digital experience.
            </p>

            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Linkedin, href: "#" },
              ].map(({ Icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="w-9 h-9 flex items-center justify-center rounded-full
                             bg-white/10 hover:bg-secondary transition
                             hover:-translate-y-1"
                >
                  <Icon size={18} className="text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5 uppercase tracking-wide">
              Company
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-secondary transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5 uppercase tracking-wide">
              Get In Touch
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-white">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-secondary" />
                Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-secondary" />
                +880 1234 567 890
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-secondary" />
                support@prescripto.com
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-white/10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-sm text-shadow-white">
          <p>
            © 2025 <span className="text-white font-medium">Prescripto</span>.
            All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
