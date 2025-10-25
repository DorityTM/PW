interface ICredentials {
  username: string;
  password: string;
}

interface IUserRegData {
  summary: string;
  credentials: ICredentials;
  successMessage?: string;
  errorMessage?: string;
}

export enum NOTIFICATIONS {
  SUCCESS = "Successfully registered! Please, click Back to return on login page",
  EMPTY_CREDS_REGISTRATION = "Please, provide valid data",
  USER_EXISTS = "Username is in use",
  USERNAME_TOO_SMALL = "Username should contain at least 3 characters", 
  USERNAME_TOO_LONG = "Username should not exceed 40 characters", // > 40 are trimmed automatically
  USERNAME_SPACES = "Prefix and postfix spaces are not allowed is username",
  PASS_TOO_SMALL = "Password should contain at least 8 characters", 
  PASS_TOO_LONG = "Password should not exceed 20 characters", // > 20 are trimmed automatically
  PASS_WITHOUT_UPPER_CASE = "Password must contain at least one uppercase letter", // case failed
  PASS_WITHOUT_LOWER_CASE = "Password should contain at least one character in lower case",
  PASS_SPACES = "Password is required",
  EMPTY_CREDS_LOGIN = "Credentials are required",
  EMPTY_USERNAME = "Username is required",
  EMPTY_PASS = "Password is required",
  INVALID_CREDS_LOGIN = "Invalid credentials",
}

const validCredentials: ICredentials = {
  username: "MadManul",
  password: "YaNeVdupliayu007",
};

export const validRegCreds: IUserRegData[] = [
  {
    summary: "VALID USER REGISTRATION CREDENTIALS",
    credentials: validCredentials,
    successMessage: NOTIFICATIONS.SUCCESS,
  },
];

export const invalidRegCreds: IUserRegData[] = [
  {
    summary: "EMPTY Username & Password",
    credentials: {
      username: "",
      password: "",
    },
    errorMessage: NOTIFICATIONS.EMPTY_CREDS_REGISTRATION,
  },
  {
    summary: "EMPTY Username",
    credentials: {
      username: "",
      password: validCredentials.password,
    },
    errorMessage: NOTIFICATIONS.EMPTY_USERNAME,
  },
  {
    summary: "EMPTY Password",
    credentials: {
      username: validCredentials.username,
      password: "",
    },
    errorMessage: NOTIFICATIONS.EMPTY_PASS,
  },
  {
    summary: "Username with spaces only",
    credentials: {
      username: "        ",
      password: validCredentials.password,
    },
    errorMessage: NOTIFICATIONS.USERNAME_SPACES,
  },
  {
    summary: "Username < 3 characters",
    credentials: {
      username: "TD",
      password: validCredentials.password,
    },
    errorMessage: NOTIFICATIONS.USERNAME_TOO_SMALL,
  },
  {
    summary: " Username > 40 characters",
    credentials: {
      username: "Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso",
      password: validCredentials.password,
    },
    errorMessage: NOTIFICATIONS.USERNAME_TOO_LONG,
  },
  {
    summary: "Username with spaces at the beginning and the end",
    credentials: {
      username: " MadManul ",
      password: validCredentials.password,
    },
    errorMessage: NOTIFICATIONS.USERNAME_SPACES,
  },
  {
    summary: "Password without uppercase letter",
    credentials: {
      username: validCredentials.username,
      password: "yanevdupliayu007",
    },
    errorMessage: NOTIFICATIONS.PASS_WITHOUT_UPPER_CASE,
  },
  {
    summary: "Password with only uppercase letters",
    credentials: {
      username: validCredentials.username,
      password: "YANEVDUPLIAYU007",
    },
    errorMessage: NOTIFICATIONS.PASS_WITHOUT_LOWER_CASE,
  },
  {
    summary: "Password with spaces only",
    credentials: {
      username: validCredentials.username,
      password: "        ",
    },
    errorMessage: NOTIFICATIONS.PASS_SPACES,
  },
  {
    summary: "Password < 8 characters",
    credentials: {
      username: validCredentials.username,
      password: "Ya007",
    },
    errorMessage: NOTIFICATIONS.PASS_TOO_SMALL,
  },
  {
    summary: "Password > 20 characters",
    credentials: {
      username: validCredentials.username,
      password:
        "OdnaGrebanayaRozaBudetTorchatIzTvoejZadnicyEsliNeDashMneDostupPryamoSejchas",
    },
    errorMessage: NOTIFICATIONS.PASS_TOO_LONG,
  },
];
