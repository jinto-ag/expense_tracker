import moment from "moment";
import * as yup from "yup";

export const DateTimeSchema = yup.object().shape({
  dateTime: yup
    .mixed()
    .test("is-valid-date", "Date must be in the format YYYY-MM-DD", (value) =>
      moment(value, "YYYY-MM-DD", true).isValid()
    )
    .required(),
});

export const TimeStampSchema = yup.object().shape({
  createdOn: DateTimeSchema,
  updatedOn: DateTimeSchema,
});

export const UserSchema = yup.object().shape({
  uid: yup.string().required(),
  email: yup.string().email(),
  emailVerified: yup.boolean(),
  displayName: yup.string(),
  photoURL: yup.string().url(),
  phoneNumber: yup.string(),
  disabled: yup.boolean(),
  metadata: yup.object().shape({
    creationTime: yup.string(),
    lastSignInTime: yup.string(),
  }),
  providerData: yup.array().of(
    yup.object().shape({
      uid: yup.string(),
      displayName: yup.string(),
      email: yup.string().email(),
      photoURL: yup.string().url(),
      providerId: yup.string(),
      phoneNumber: yup.string(),
    })
  ),
});

export const BaseRecordSchema = yup.object().shape({
  id: yup.string().required(),
  user: UserSchema,
  timeStamp: TimeStampSchema,
});

export const ActivitySchema = BaseRecordSchema.concat(yup.object().shape({}));

export const ProfileSchema = BaseRecordSchema.concat(yup.object().shape({}));

export const TeamSchema = BaseRecordSchema.concat(yup.object().shape({}));

export const FeedbackSchema = BaseRecordSchema.concat(yup.object().shape({}));

export const ExpenseSchema = BaseRecordSchema.concat(
  yup.object().shape({
    amountPaid: yup.number().required(),
    catogory: yup.string().required(),
    date: DateTimeSchema,
    feedback: FeedbackSchema,
    name: yup.string().required(),
    remarks: yup.string().required(),
    team: TeamSchema,
    totalAmount: yup.number().required(),
  })
);
