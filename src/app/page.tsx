// import ChosungGame from '../components/ChosungGame';

import AITranslationPage from "@/components/AITranslation";

// export default function Home() {
//   return (
//     <main>
//       <ChosungGame />
//     </main>
//   );
// }


export default function Home() {
  return (
    <main style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <AITranslationPage />
    </main>
  );
}