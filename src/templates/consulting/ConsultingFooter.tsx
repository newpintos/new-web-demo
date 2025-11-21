export function ConsultingFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Strategic Partners
            </h3>
            <p className="text-gray-400 mb-4">
              Empowering businesses to achieve excellence through strategic consulting and proven methodologies.
            </p>
          </div>
          <div>
            <h4 className="text-white mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Strategy</li>
              <li>Analysis</li>
              <li>Leadership</li>
              <li>Optimization</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>789 Business Plaza</p>
              <p>(555) 456-7890</p>
              <p>hello@strategic.partners</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500">
          <p>&copy; 2024 Strategic Partners. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
