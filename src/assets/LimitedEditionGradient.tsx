export type TwinkleType = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

export const LimitedEditionGradient = (twinkle?: TwinkleType) => {
  return (
    <svg
      width="324"
      height="115"
      viewBox="0 0 324 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="324" height="115" fill="url(#paint0_linear_28_6)" />
      <circle
        cx="187"
        cy="108"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[0] || 1}
      />
      <circle
        cx="250"
        cy="104"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[1] || 1}
      />
      <circle
        cx="225"
        cy="107"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[2] || 1}
      />
      <circle
        cx="279"
        cy="101"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[3] || 1}
      />
      <circle
        cx="293"
        cy="78"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[4] || 1}
      />
      <circle
        cx="265"
        cy="111"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[5] || 1}
      />
      <circle
        cx="212"
        cy="95"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[6] || 1}
      />
      <circle
        cx="193"
        cy="57"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[7] || 1}
      />
      <circle
        cx="169"
        cy="50"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[8] || 1}
      />
      <circle
        cx="297"
        cy="95"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[9] || 1}
      />
      <circle
        cx="276"
        cy="31"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[10] || 1}
      />
      <circle
        cx="305"
        cy="39"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[11] || 1}
      />
      <circle
        cx="322"
        cy="24"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[12] || 1}
      />
      <circle
        cx="298"
        cy="111"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[13] || 1}
      />
      <circle
        cx="319"
        cy="102"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[14] || 1}
      />
      <circle
        cx="222"
        cy="18"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[15] || 1}
      />
      <circle
        cx="135"
        cy="111"
        r="1"
        fill={twinkle ? "#FFFFFF" : "#AEAEAE"}
        opacity={twinkle?.[16] || 1}
      />
      <defs>
        <linearGradient
          id="paint0_linear_28_6"
          x1="140.786"
          y1="-8.51853"
          x2="327.814"
          y2="226.429"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#270C72" />
          <stop offset="1" stopColor="#050013" />
        </linearGradient>
      </defs>
    </svg>
  );
};
