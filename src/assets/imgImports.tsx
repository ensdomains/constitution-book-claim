import type { StaticImageData } from "next/image";
import DEone from "../../public/img/DE/one.png";
import LEeight from "../../public/img/LE/eight.png";
import LEfive from "../../public/img/LE/five.png";
import LEfour from "../../public/img/LE/four.png";
import LEnine from "../../public/img/LE/nine.png";
import LEone from "../../public/img/LE/one.png";
import LEseven from "../../public/img/LE/seven.png";
import LEsix from "../../public/img/LE/six.png";
import LEthree from "../../public/img/LE/three.png";
import LEtwo from "../../public/img/LE/two.png";
import UEeight from "../../public/img/UE/eight.png";
import UEfive from "../../public/img/UE/five.png";
import UEfour from "../../public/img/UE/four.png";
import UEnine from "../../public/img/UE/nine.png";
import UEone from "../../public/img/UE/one.png";
import UEseven from "../../public/img/UE/seven.png";
import UEsix from "../../public/img/UE/six.png";
import UEthree from "../../public/img/UE/three.png";
import UEtwo from "../../public/img/UE/two.png";

export const DE: [StaticImageData, string][] = [
  [DEone, "Digital edition cover"],
];

export const LE: [StaticImageData, string][] = [
  [LEone, "Limited edition book and case"],
  [LEtwo, "Limited edition front cover"],
  [LEthree, "Limited edition page example 1"],
  [LEfour, "Limited edition page example 2"],
  [LEfive, "Limited edition page example 3"],
  [LEsix, "Limited edition page example 4"],
  [LEseven, "Limited edition page example 5"],
  [LEeight, "Limited edition page example 6"],
  [LEnine, "Limited edition page example 7"],
];

export const UE: [StaticImageData, string][] = [
  [UEone, "Unlimited edition front cover"],
  [UEtwo, "Unlimited edition page example 1"],
  [UEthree, "Unlimited edition page example 2"],
  [UEfour, "Unlimited edition page example 3"],
  [UEfive, "Unlimited edition page example 4"],
  [UEsix, "Unlimited edition page example 5"],
  [UEseven, "Unlimited edition page example 6"],
  [UEeight, "Unlimited edition page example 7"],
  [UEnine, "Unlimited edition page example 8"],
];
