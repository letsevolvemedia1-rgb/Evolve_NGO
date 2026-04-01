import Image from "next/image";

export function AboutHero() {
    return (
        <section className="relative w-full">
            <div className="relative w-full h-[400px] md:h-[700px] lg:h-[800px] overflow-hidden">
                <Image
                    src="/About/Hero.svg"
                    alt="Evolve Sangh Foundation — Youth Empowerment"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>
        </section>
    );
}
