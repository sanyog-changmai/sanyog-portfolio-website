import { Github, Linkedin, Mail, FileText, ChevronDown } from "lucide-react";

const Hero = ({ profile }) => {
	if (!profile) return null;

	return (
		<section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-float"></div>
				<div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float animation-delay-200"></div>
				<div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-float animation-delay-400"></div>
			</div>

			{/* Grid pattern overlay */}
			<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

			{/* Bottom gradient fade to next section */}
			<div className="absolute bottom-0 left-0 right-0 h-[600px] bg-gradient-to-b from-transparent to-gray-950"></div>

			<div className="relative z-10 max-w-6xl mx-auto px-6 min-h-screen flex flex-col justify-center items-center text-center">
				<div className="space-y-6">
					<div className="animate-fade-in-up">
						<span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
							Welcome to my portfolio
						</span>
					</div>

					<h1 className="text-5xl md:text-7xl font-bold text-white animate-fade-in-up animation-delay-200">
						Hi, I'm <span className="gradient-text">{profile.name}</span>
					</h1>

					<p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
						{profile.title}
					</p>

					<p className="text-lg text-gray-500 max-w-xl mx-auto animate-fade-in-up animation-delay-600">
						{profile.bio}
					</p>

					<div className="flex flex-wrap justify-center gap-4 pt-4 animate-fade-in-up animation-delay-600">
						{profile.email && (
							<a
								href={`mailto:${profile.email}`}
								className="btn-primary px-6 py-3 rounded-lg text-white font-medium flex items-center gap-2"
							>
								<Mail size={20} />
								Get in Touch
							</a>
						)}
						<div className="flex gap-3">
							{profile.github_url && (
								<a
									href={profile.github_url}
									target="_blank"
									rel="noopener noreferrer"
									className="p-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
									aria-label="GitHub"
								>
									<Github size={22} />
								</a>
							)}
							{profile.linkedin_url && (
								<a
									href={profile.linkedin_url}
									target="_blank"
									rel="noopener noreferrer"
									className="p-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
									aria-label="LinkedIn"
								>
									<Linkedin size={22} />
								</a>
							)}
							{profile.resume_url && (
								<a
									href={profile.resume_url}
									target="_blank"
									rel="noopener noreferrer"
									className="p-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
									aria-label="Resume"
								>
									<FileText size={22} />
								</a>
							)}
						</div>
					</div>
				</div>

				{/* Scroll indicator */}
				<a
					href="#experience"
					className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 hover:text-white transition-colors animate-bounce"
				>
					<ChevronDown size={32} />
				</a>
			</div>
		</section>
	);
};

export default Hero;
