import React, { useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-white font-sans overflow-x-hidden min-h-screen bg-black">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 z-[10000] w-full bg-black bg-opacity-80 shadow-md backdrop-blur-sm border-b border-yellow-900/30">
        <div className="max-w-5xl mx-auto flex justify-center space-x-8 py-4">
          <RouterLink
            to="/"
            className="text-yellow-500 hover:text-yellow-400 font-semibold transition cursor-pointer"
          >
            Home
          </RouterLink>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-40 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-slate-900/60 border border-yellow-700/30 rounded-lg p-8">
            <h1 className="text-4xl font-bold text-yellow-500 mb-6">VisionPort Privacy Policy</h1>
            <p className="text-gray-400 mb-8">Last Updated: May 4, 2025</p>
            
            <p className="text-gray-300 mb-8">
              Thank you for choosing VisionPort (Port Crane Simulator)! Your privacy is important to us. 
              This Privacy Policy explains how we collect, use, and protect information when you use our app on Apple Vision Pro. 
              VisionPort is designed to be a fun and educational mixed reality (MR) experience, and we are committed to keeping your data safe.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">1. Information We Collect</h2>
              <p className="text-gray-300 mb-4">VisionPort does not collect, store, or share any personal information about you. Here's what this means:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>No Personal Data: We do not require you to create an account, sign in, or provide personal details like your name, email, or location.</li>
                <li>No Device Data: We do not collect identifiers like device IDs, IP addresses, or other tracking data.</li>
                <li>Gameplay Data: The app generates temporary, non-personal data (e.g., your progress in Tutorial Mode, scores in Mission Mode, or training reports) stored locally on your Apple Vision Pro. This data is only used to enhance your experience and is not sent to us or any third party.</li>
              </ul>
              <h3 className="text-xl font-bold text-yellow-500 mt-4 mb-2">Permissions:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Hand Tracking: VisionPort uses Apple Vision Pro's hand tracking to enable gesture controls. This data is processed locally by Apple's systems and is not accessed or stored by us.</li>
                <li>Audio: The app uses audio for spatial sound feedback (e.g., crane sounds). We do not record or access your microphone.</li>
                <li>No other permissions (e.g., camera, location, or contacts) are used.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">2. How We Use Information</h2>
              <p className="text-gray-300 mb-4">Since we do not collect personal information, there is no personal data to use or share. The temporary gameplay data (e.g., scores or training reports) is used only to:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Track your progress within the app (e.g., completed missions or tutorial steps).</li>
                <li>Generate performance reports viewable within the app to help you improve your crane operation skills.</li>
                <li>Enhance your experience by remembering your preferences (e.g., control settings) during a session.</li>
              </ul>
              <p className="text-gray-300 mt-4">This data is stored locally on your device and is deleted when you uninstall the app or clear the app's data.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">3. Sharing Information</h2>
              <p className="text-gray-300">We do not share any data with third parties because we do not collect personal information. VisionPort does not use third-party analytics, advertising, or tracking services.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">4. Supplementary Website</h2>
              <p className="text-gray-300 mb-4">VisionPort includes a link to our supplementary website, which provides additional information about gameplay, port careers, and developer details. If you visit this website:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>We do not collect personal information unless you voluntarily contact us (e.g., via email).</li>
                <li>The website may use basic analytics (e.g., Google Analytics) to track anonymous usage (e.g., page views). This data is not linked to you personally and is used only to improve the website.</li>
                <li>Please review the website's separate privacy policy for more details.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">5. Data Security</h2>
              <p className="text-gray-300">We take data security seriously, even though we do not collect personal information. VisionPort uses Apple's secure development frameworks (e.g., Unity with PolySpatial for visionOS) to ensure gameplay data stored locally is protected by your device's security features (e.g., encryption). No data is transmitted to external servers.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">6. Children's Privacy</h2>
              <p className="text-gray-300">VisionPort is suitable for users of all ages, including children. Since we do not collect personal information, there is no risk to children's privacy. The app complies with the Children's Online Privacy Protection Act (COPPA) and similar regulations.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">7. Your Rights</h2>
              <p className="text-gray-300 mb-4">Under laws like the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you have rights over your personal data. Since VisionPort does not collect personal information, no personal data is available to access, delete, or modify. If you have questions about gameplay data stored locally, you can:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Reset progress within the app (via the "Reset Progress" option in settings).</li>
                <li>Uninstall the app to delete all local data.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">8. Changes to This Privacy Policy</h2>
              <p className="text-gray-300">We may update this Privacy Policy to reflect changes in the app or legal requirements. If we make significant changes, we will notify you through the app or our website. The "Last Updated" date at the top shows when the policy was last revised.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">9. Contact Us</h2>
              <p className="text-gray-300 mb-2">If you have questions about this Privacy Policy or VisionPort, please contact us at:</p>
              <p className="text-gray-300">Email: <a href="mailto:sustehk@gmail.com" className="text-yellow-500 hover:text-yellow-400">sustehk@gmail.com</a></p>
              <p className="text-gray-300">Website: <a href="https://ust-seteam2025.github.io/VisionPort/" className="text-yellow-500 hover:text-yellow-400">https://ust-seteam2025.github.io/VisionPort/</a></p>
              <p className="text-gray-300 mt-4">We're happy to help with any concerns!</p>
            </section>

            <div className="mt-8 pt-8 border-t border-yellow-900/30">
              <p className="text-gray-300 italic">Note: By using VisionPort, you agree to this Privacy Policy. Thank you for trusting us to provide a safe and fun experience!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwZjE3MmEiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzcuNSAzMGMwIDQuMTQyLTMuMzU4IDcuNS03LjUgNy41LTQuMTQyIDAtNy41LTMuMzU4LTcuNS03LjUgMC00LjE0MiAzLjM1OC03LjUgNy41LTcuNSA0LjE0MiAwIDcuNSAzLjM1OCA3LjUgNy41eiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlPSIjZWFiMzA4IiBmaWxsLW9wYWNpdHk9Ii4wMiIgZmlsbD0iI2VhYjMwOCIvPjxwYXRoIGQ9Ik0zMCAwdjYwTTYwIDMwSDAiIHN0cm9rZS1vcGFjaXR5PSIuMDUiIHN0cm9rZT0iI2VhYjMwOCIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 