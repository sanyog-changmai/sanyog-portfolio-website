const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="py-8 bg-gray-950 border-t border-gray-800/50">
			<div className="max-w-6xl mx-auto px-6">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-gray-500 text-sm">
						&copy; {currentYear} All rights reserved.
					</p>
					<p className="text-gray-600 text-sm">
						Built with <span className="text-indigo-400">React</span>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
