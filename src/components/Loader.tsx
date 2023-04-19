import React from "react";
import logo from "../assets/logo.svg";
import styles from "./Loader.module.css";

interface Props {
  size?: number;
  strokeWidth?: number;
  variant?: "default" | "success" | "danger" | "info" | "warning";
}

const variantConfig = {
  default: {
    size: 180,
    strokeWidth: 8,
    strokeColor: "#B9173B",
  },
  success: {
    size: 180,
    strokeWidth: 8,
    strokeColor: "#28a745",
  },
  danger: {
    size: 180,
    strokeWidth: 8,
    strokeColor: "#dc3545",
  },
  info: {
    size: 180,
    strokeWidth: 8,
    strokeColor: "#17a2b8",
  },
  warning: {
    size: 180,
    strokeWidth: 8,
    strokeColor: "#ffc107",
  },
};

const Loader: React.FC<Props> = ({
  size,
  strokeWidth,
  variant = "default",
}) => {
  const {
    size: defaultSize,
    strokeWidth: defaultStrokeWidth,
    strokeColor,
  } = variantConfig[variant];

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <svg
        width={size || defaultSize}
        height={size || defaultSize}
        viewBox={`0 0 ${size || defaultSize} ${size || defaultSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x={(strokeWidth || defaultStrokeWidth) / 2}
          y={(strokeWidth || defaultStrokeWidth) / 2}
          width={(size || defaultSize) - (strokeWidth || defaultStrokeWidth)}
          height={(size || defaultSize) - (strokeWidth || defaultStrokeWidth)}
          rx={((size || defaultSize) - (strokeWidth || defaultStrokeWidth)) / 2}
          stroke={strokeColor}
          strokeWidth={strokeWidth || defaultStrokeWidth}
          strokeDasharray="64 16"
          className={styles.animatedCircle}
        />
        <image
          href={logo}
          x={((size || defaultSize) - (size || defaultSize) * 0.8) / 2}
          y={((size || defaultSize) - (size || defaultSize) * 0.8) / 2}
          height={(size || defaultSize) * 0.8}
          width={(size || defaultSize) * 0.8}
        />
      </svg>
    </div>
  );
};

export default Loader;
