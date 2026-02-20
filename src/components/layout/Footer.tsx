import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Settings } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Temple Gateway Logo" className="w-12 h-12 object-contain" />
              <span className="font-display font-semibold text-xl text-background">
                Temple Gateway
              </span>
            </div>
            <p className="text-background/70 font-body text-sm leading-relaxed">
              Embark on sacred journeys to India's most revered temples. 
              Discover divine heritage and spiritual enlightenment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-saffron">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Temples", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-background/70 hover:text-saffron transition-colors font-body text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-saffron">Popular Temples</h4>
            <ul className="space-y-3">
              {["Tirupati Balaji", "Vaishno Devi", "Kashi Vishwanath", "Meenakshi Temple"].map((item) => (
                <li key={item}>
                  <span className="text-background/70 font-body text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-saffron">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-saffron mt-0.5 flex-shrink-0" />
                <span className="text-background/70 font-body text-sm">
                  123 Temple Street, Heritage District, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-saffron flex-shrink-0" />
                <span className="text-background/70 font-body text-sm">+917299341874</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-saffron flex-shrink-0" />
                <span className="text-background/70 font-body text-sm">ta.vengat@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 font-body text-sm">
            © {new Date().getFullYear()} Temple Gateway. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-background/60 font-body text-sm">
              🙏 Crafted with devotion for spiritual seekers
            </p>
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-background/40 hover:text-saffron transition-colors font-body text-xs"
            >
              <Settings size={14} />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
