import rough from "roughjs";
import { useRef, useLayoutEffect, ReactNode } from "react";
import { css } from "@emotion/react";

type Props = {
  children?: ReactNode;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  elevation?: number;
};

const buttonStyle = css({
  position: "relative",
  userSelect: "none",
  border: "none",
  background: "none",
  textAlign: "center",
  fontWeight: 600,
  fontFamily: "inherit",
  cursor: "pointer",
  padding: "4px 16px",
  minHeight: "2.5rem",
  "&[disabled]": {
    opacity: 0.6,
    background: "rgba(0, 0, 0, 0.07)",
    cursor: "default",
    pointerEvents: "none",
  },
  "& svg": {
    display: "block",
  },
  "& path": {
    strokeWidth: 0.7,
  },
  "&:hover path": {
    strokeWidth: 0.9,
  },
  "&:active path": {
    transform: "scale(0.97) translate(1.5%, 1.5%)",
  },
  "&:focus path": {
    strokeWidth: 1.5,
  },
});
const Button = (props: Props) => {
  const { children, disabled, size, elevation = 1 } = props;
  const svgRef = useMeasure(elevation);

  return (
    <button
      disabled={disabled}
      css={css(
        buttonStyle,
        size === "sm"
          ? { padding: "2px 12px", minHeight: "1.8rem" }
          : size === "lg"
          ? { padding: "6px 24px", minHeight: "3rem", fontSize: "1rem" }
          : {}
      )}
    >
      {children}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: -1,
        }}
      >
        <svg ref={svgRef}></svg>
      </div>
    </button>
  );
};

export default Button;

const useMeasure = (elevation: number) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        const elev = Math.min(Math.max(1, elevation), 5);

        svgRef.current?.setAttribute("width", (width + elev * 2).toString());
        svgRef.current?.setAttribute("height", (height + elev * 2).toString());

        const rc = rough.svg(svgRef.current as SVGSVGElement);
        let node = rc.rectangle(2, 2, width - 2, height - 2);

        let elevElement: SVGGElement[] = [node];

        for (let i = 1; i < elev; i++) {
          elevElement.push(
            rc.line(i * 2, height + i * 2, width + i * 2, height + i * 2),
            rc.line(width + i * 2, height + i * 2, width + i * 2, i * 2)
          );
        }
        drawSvg(svgRef.current as SVGSVGElement, elevElement);
      }
    });

    resizeObserver.observe(svgRef.current?.parentElement as Element);

    return () => {
      if (svgRef.current) svgRef.current.textContent = "";
      resizeObserver.disconnect();
    };
  }, [svgRef]);

  return svgRef;
};

const drawSvg = (svg: SVGSVGElement, elements: SVGGElement[]) => {
  for (let el of elements) {
    svg.appendChild(el);
  }
};
