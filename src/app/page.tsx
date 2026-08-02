import Hero from "@/components/Hero";
import Apology from "@/components/Apology";
import Timeline from "@/components/Timeline";
import LiveCounter from "@/components/LiveCounter";
import ReasonsGrid from "@/components/ReasonsGrid";
import CouponBook from "@/components/CouponBook";
import ClosingNote from "@/components/ClosingNote";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import MusicToggle from "@/components/MusicToggle";
import FloatingParticles from "@/components/FloatingParticles";
import CursorGlow from "@/components/CursorGlow";
import QuizGate from "@/components/QuizGate";

export default function Home() {
  return (
    <QuizGate>
      {/* Persistent overlays */}
      <ScrollProgress />
      <MusicToggle />
      <FloatingParticles />
      <CursorGlow />

      {/* Main content — sections flow dark → warm like a sunrise */}
      <main>
        <Hero />
        <Apology />
        <Timeline />
        <LiveCounter />
        <ReasonsGrid />
        <CouponBook />
        <ClosingNote />
        <Footer />
      </main>
    </QuizGate>
  );
}
