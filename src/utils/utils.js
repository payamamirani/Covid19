import jalaali from "jalaali-js";
import moment from "moment-jalaali";

export function toJalaliDateTime(datetime) {
  const split = datetime.split("T");
  const dateObj = split[0].split("-");
  const timeObj = split[1].split(".")[0].split(":");

  const { jy, jm, jd } = jalaali.toJalaali(
    parseInt(dateObj[0]),
    parseInt(dateObj[1]),
    parseInt(dateObj[2])
  );

  return `${jy.toString()}/${jm
    .toString()
    .padStart(2, "0")}/${jd.toString().padStart(2, "0")} 
  ${timeObj[0]}:${timeObj[1]}:${timeObj[2]}`;
}

export function momentJalali() {
  return toMomentJalaliDateTime(moment().format("YYYY-MM-DDTHH:mm:ss"));
}

export function toMomentJalaliDateTime(datetime) {
  return moment(toJalaliDateTime(datetime), "jYYYY/jMM/jDD HH:mm");
}
