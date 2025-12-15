"use client";

// // 1. Layered Depth Shadow (Multiple layers)
// shadow-[0_4px_0_0_rgba(76,92,104,1),0_8px_0_0_rgba(70,73,76,0.5),0_12px_20px_0_rgba(0,0,0,0.15)]

// // 2. Neon Glow Effect
// shadow-[0_0_20px_rgba(25,133,161,0.6),0_0_40px_rgba(25,133,161,0.4),0_0_60px_rgba(25,133,161,0.2)]

// // 3. Brutal/Neobrutalism Shadow (Offset with border)
// shadow-[0_0_0_2px_rgba(70,73,76,1),8px_8px_0_0_rgba(25,133,161,1)]

// // 4. Double Offset Shadow
// shadow-[4px_4px_0_0_rgba(76,92,104,1),8px_8px_0_0_rgba(25,133,161,0.5)]

// // 5. Soft Elevated Shadow
// shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(76,92,104,0.2),0_16px_32px_rgba(76,92,104,0.15)]

// // 6. Inner + Outer Shadow Combo
// shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_4px_8px_rgba(76,92,104,0.3)]

// // 7. Asymmetric Shadow (More dramatic)
// shadow-[12px_12px_0_0_rgba(25,133,161,1),0_0_0_2px_rgba(70,73,76,1)]

// // 8. Pixel Art / Retro Shadow
// shadow-[2px_2px_0_0_rgba(76,92,104,1),4px_4px_0_0_rgba(70,73,76,1),6px_6px_0_0_rgba(25,133,161,1)]

// // 9. Glossy Button Shadow
// shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_8px_rgba(76,92,104,0.3),0_1px_2px_rgba(0,0,0,0.2)]

// // 10. Floating Card Shadow
// shadow-[0_10px_30px_-5px_rgba(76,92,104,0.3),0_20px_40px_-10px_rgba(70,73,76,0.2)]

// // 11. Hard Edge with Glow
// shadow-[0_0_0_2px_rgba(197,195,198,1),6px_6px_0_0_rgba(76,92,104,1),0_0_30px_rgba(25,133,161,0.3)]

// // 12. Neumorphism Shadow
// shadow-[8px_8px_16px_rgba(70,73,76,0.2),-8px_-8px_16px_rgba(255,255,255,0.7)]

// // 13. Sharp Corner Highlight
// shadow-[0_0_0_1px_rgba(197,195,198,0.3),6px_6px_0_0_rgba(25,133,161,1),6px_6px_0_1px_rgba(70,73,76,1)]

// // 14. Triple Layer Depth
// shadow-[0_0_0_1px_rgba(197,195,198,1),3px_3px_0_0_rgba(76,92,104,1),6px_6px_0_0_rgba(70,73,76,0.6)]

// // 15. Cyberpunk Glow
// shadow-[0_0_10px_rgba(25,133,161,0.8),0_0_20px_rgba(25,133,161,0.5),4px_4px_0_0_rgba(76,92,104,1)]

// // 16. Soft Brutalism (Softer edges with offset)
// shadow-[0_0_0_1px_rgba(197,195,198,0.5),5px_5px_15px_rgba(76,92,104,0.4)]

// // 17. Bottom Heavy Shadow
// shadow-[0_8px_0_0_rgba(76,92,104,1),0_12px_24px_rgba(70,73,76,0.3)]

// // 18. Rainbow Edge (Colorful)
// shadow-[0_0_0_2px_rgba(25,133,161,1),4px_4px_0_0_rgba(76,92,104,1),0_0_20px_rgba(25,133,161,0.4)]

// // 19. Pressed Button Effect
// shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_0_0_1px_rgba(70,73,76,0.3)]

// // 20. Extreme Offset
// shadow-[0_0_0_2px_rgba(197,195,198,1),12px_12px_0_0_rgba(25,133,161,1),12px_12px_0_2px_rgba(70,73,76,1)]

// Hover transition between shadows
export default function Test() {
  return (
    <>
      <button
        className="
    bg-white 
    border-2 
    border-charcoal
    transition-all 
    duration-300
    shadow-[0_0_0_1px_rgba(197,195,198,0.3),4px_4px_0_0_rgba(76,92,104,1)]
    hover:shadow-[0_0_0_2px_rgba(25,133,161,1),8px_8px_0_0_rgba(76,92,104,1)]
    hover:-translate-y-1
  "
      >
        Hover Me
      </button>

      {/* Or with your color variables */}
      <div
        className="
    shadow-[0_0_20px_rgba(25,133,161,0.6),0_0_40px_rgba(25,133,161,0.4)]
    hover:shadow-[0_0_30px_rgba(25,133,161,0.8),0_0_60px_rgba(25,133,161,0.6)]
  "
      >
        Neon Glow
      </div>
    </>
  );
}
