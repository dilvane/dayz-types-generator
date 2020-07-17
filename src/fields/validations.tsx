import { format, parse } from "date-fns";
import { mixed } from "yup";

export const date = () =>
  mixed()
    .required("Obrigatório")
    .test("invalidDate", "Data inválida", (value) => {
      try {
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

export const file = ({ MAX_SIZE, SUPPORTED_FORMATS }) =>
  mixed()
    .required("Obrigatório")
    .test(
      "fileFormat",
      "Formato não suportado",
      (value) => value && SUPPORTED_FORMATS.includes(value.mime)
    )
    .test(
      "fileSize",
      "Ficheiro muito grande",
      (value) => value && value.size <= MAX_SIZE
    );
