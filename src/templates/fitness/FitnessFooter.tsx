export function FitnessFooter() {
  return (
    <footer className="bg-black border-t-4 border-lime-500 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl text-white mb-4 uppercase tracking-wide">PowerFit Gym</h3>
            <p className="text-gray-400">Transform your life, one rep at a time.</p>
          </div>
          <div>
            <h4 className="text-lime-400 mb-4 uppercase">Hours</h4>
            <div className="space-y-2">
              <p>Mon-Fri: 5am - 11pm</p>
              <p>Sat-Sun: 6am - 10pm</p>
              <p className="text-lime-400">Open 7 Days</p>
            </div>
          </div>
          <div>
            <h4 className="text-lime-400 mb-4 uppercase">Contact</h4>
            <div className="space-y-2">
              <p>456 Fitness Ave</p>
              <p>(555) 987-6543</p>
              <p>info@powerfit.gym</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500">
          <p>&copy; 2024 PowerFit Gym. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
