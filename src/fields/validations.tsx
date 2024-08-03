import { format, parse } from "date-fns";
import { mixed } from "yup";

export const date = () =>
  mixed()
    .required("Obrigatório")
    .test("invalidDate", "Data inválida", (value) => {
      try {
        // @ts-ignore
        const date = parse(value, "dd/MM/yyyy", new Date());
        format(date, "dd/MM/yyyy");
        if (date > new Date() || date < new Date("01-01-1900")) {
          return false;
        }
      } catch (e) {
        return false;
      }

      return true;
    });

export const file = ({ SUPPORTED_FORMATS }) =>
  mixed()
    .required()
    .test(
      "fileFormat",
      "Format is not supported",
      // @ts-ignore
      (value) => value && SUPPORTED_FORMATS.includes(value.mime)
    );
