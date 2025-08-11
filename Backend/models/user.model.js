import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALUAAACUCAMAAADifZgIAAAARVBMVEX6+vqPj4////+GhobIyMiMjIyJiYmDg4OSkpKbm5v39/fAwMCYmJjX19fz8/Pp6emqqqrf39/R0dG0tLSioqJ9fX26urrZWJjcAAADu0lEQVR4nO2c15KjMBBFUQtFQIH0/5+6YDyznnIAyShQpfPg8bydUjVKfXFVFQqFQqFQKBQKhUKhEB/YSK3hwCKrtF3RqrqGOYDum2EUfEWMQ9Op7MUBrOGIUELQClm+IW5s3t6ypmzzfYQw1MtcvUH2LXtS3mBjl6c3aEOfx/l3vMmgM9SGjrx3vnkjm5/2/K44Hsqkzk17prvSCNEmK20Y8AHpzLShPia9FEmXjTb0R8rjPtq5PJKg28+zxyNkVKl97wzHh3ot7dS6N8AeLeoNnMVqA8fL414jGVhDt7+8/GXKYLBBOEojYpJbg3WVXtDJrWfHsl4HO/kKqUYPa5NYGmzrLI2ISPw8Qu8+1AupdyONy7r4A0680ZZOq/kPqVd1ZXwqhA4yrbXHFJKBtfCxJuaa1mk32Z4VkthaXvJpvObMVzVuB5m7deJVxuV4/kDiFR0sd3cmberTzCV3qn6nguS3lNA5Sy8nsNTWFTgfC3K4WoDe9WaBpR/qRRu5VTYVGUg7X+Ngm9r4hjQu6yMeUvtuuN0Epz6f/+K0rOdy675oN0dLO6s2GJhj2mzOSLo62C/IqgW2Ig80HEmd2vKZ/kVa4c9A09T3ZK8AzT/N2yybKe8vADV/kwAgpO2zTbaAmgV9rm9KRaNyda620JPB7FGcMjr0eRbHAyBVP/BpmhhjyycfOlXl7nxjDfIpvSIvlumrrhZCLBSuC5xAfGfV1d9i4+ZuQTVkYvhb2MTriCt9x11vbt5AmIh1zyCbnWynkzeKc1QAr/bAe+0ohwWw05nSKFKiyKM58BkS/uIPaq9GzEdw8BoBrwbjZ8gQ2trlTu+wtQjc6vXqee1ah+6JQRfAGrWBryyLdUzrANLhra/5NPqkDnetRejgqvaKDO1Yj8FDLl6RoR3r4NHmICt68L5HiN1ThB22OvVMsFmHdl4T+WeXSIzEvntGYQ8Wo3EqT5YmIrzzOtjnVjaO06NW45nTSKwc5bk7KB4rDgBeMc/XRGxSw2k1gmO+pyTFOdo0ah4R9CnasXPYoNvvtXH090oBPr3pfwRCg1/evPJu+DfDTds0YSKwB3NDr2DJfnYBqp75re4Mdwmb6wBNS1zrhKKlOBKH3VU9EuyQQsTI5PATKKBsI6ZD4gSzsbYZOK9AJfXMJ/ZxKiSUTW2jZVZhkaVQu3ls+apHKfnP+h/ivDWNzTJ6sUhJ3fXNPBgzjqMQy8dozDDXvdVVlsp3tva4VAta6/VPdbkf2SoUCoVCoVAoFAqFQiEJ/wCzEDFMG1Nw0QAAAABJRU5ErkJggg==" },   
    address: { type: Object, default: {line1:"", line2:""} },
    gender:{ type: String, default: "Not Specified" },
    dob:{ type: String, default: "Not Selected" },
    phone:{ type: String, default: "00000000" },
  }
);

export default mongoose.model("user", userSchema);
