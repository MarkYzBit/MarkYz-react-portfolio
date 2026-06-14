import { ArrowDown } from "lucide-react";
import heroImg from "../assets/me.jpg";

export const HeroSection = () => {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center px-4"
        >
            <div className="container max-w-6xl mx-auto text-center z-10">
                <div className="space-y-6">
                    <img
                        src={heroImg}
                        alt="Profile"
                        className="hero-profile"
                    />
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        <span className="opacity-0 animate-fade-in"> Hi, I'm</span>
                        <span className="text-primary opacity-0 animate-fade-in-delay-1">
                            {" "}
                            Wiritpon
                        </span>
                        <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
                            {" "}
                            Chulagate
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
                        An undergraduate student at <strong>Chulalongkorn University</strong> <br/>pursuing a degree in Information and Communication Engineering (ICE)
                        with an interest in <br/>Software Development, Artificial Intelligence, and building practical, user-focused technology solutions.
                    </p>

                    <div className="pt-4 opacity-0 animate-fade-in-delay-4 text-primary">
                        <a href="#projects" className="cosmic-button">
                            View My Work
                        </a>
                    </div>

                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
                        <ArrowDown className="h-5 w-5 text-primary" />
                    </div>
                </div>
            </div>
        </section>
    );
}
