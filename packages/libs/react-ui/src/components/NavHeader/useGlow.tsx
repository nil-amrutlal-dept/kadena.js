import { useState, useRef, useEffect } from 'react';

interface IUseGlowReturn {
  activeNav: number;
  animationDuration: number;
  glowRef: React.RefObject<HTMLDivElement>;
  glowX: number;
  navRef: React.RefObject<HTMLDivElement>;
  setActiveNav: React.Dispatch<React.SetStateAction<number>>;
}

const useGlow = (): IUseGlowReturn => {
  const glowRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const [glowX, setGlowX] = useState(0);
  const [activeNav, setActiveNav] = useState(0);
  const prevGlowX = useRef<number>(glowX);
  const glowAnimationSpeed = useRef<number>(0);

  useEffect(() => {
    const activeNavElement = navRef.current?.querySelector(
      `li:nth-child(${activeNav}) a`,
    );
    const activeNavBounds = activeNavElement?.getBoundingClientRect();
    const glowBounds = glowRef.current?.getBoundingClientRect();
    const headerBounds = navRef.current?.parentElement?.getBoundingClientRect();

    const noActiveNav = activeNav === 0;

    if (noActiveNav && glowBounds) setGlowX(-glowBounds.width / 2);
    else if (activeNavBounds && glowBounds && headerBounds)
      setGlowX(
        activeNavBounds.x -
          headerBounds.x -
          glowBounds.width / 2 +
          activeNavBounds.width / 2,
      );
  }, [glowX, activeNav]);

  useEffect(() => {
    prevGlowX.current = glowX;
  }, [glowX]);

  glowAnimationSpeed.current = Math.abs(glowX - prevGlowX.current) * 2;

  console.log({
    activeNav,
    animationDuration: glowAnimationSpeed.current,
    glowRef,
    glowX,
    navRef,
    setActiveNav,
  });

  return {
    activeNav,
    animationDuration: glowAnimationSpeed.current,
    glowRef,
    glowX,
    navRef,
    setActiveNav,
  };
};

export default useGlow;
