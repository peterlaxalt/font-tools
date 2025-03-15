import Image from "next/image";
import styles from "./page.module.css";
import FontTester from "./components/font-tester";

export default function Home() {
  return (
    <div>
      <main>
        <FontTester />
      </main>
    </div>
  );
}
