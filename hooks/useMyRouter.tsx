import { NextRouter, useRouter } from "next/router"
import Language from "../types/Language";

export default function useMyRouter(): NextRouter {
  const router = useRouter();

  return router || {locale: Language.en}
}
