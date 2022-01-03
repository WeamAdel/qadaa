class InvalidLanguageType extends Error {
  constructor(type: string) {
    super(`Invalid language type of: ` + type);

    this.name = "InvalidLanguageType";
  }
}

export default InvalidLanguageType;
