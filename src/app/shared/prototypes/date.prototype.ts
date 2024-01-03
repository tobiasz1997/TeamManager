interface Date {
  toInputFormat(): string;

  toIsoDate(): Date;
}

Date.prototype.toInputFormat = function(): string {
  return `${this.getFullYear()}-${this.getMonth()}-${this.getDate()}`;
};

Date.prototype.toIsoDate = function(): Date {
  return new Date(this.toISOString().slice(0, -1));
};
