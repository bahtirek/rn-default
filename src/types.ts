import { TextInput, TextInputProps } from "react-native"

export type CustomButtonType = {
  label: string, 
  containerStyles?: string,
  handlePress?: any,
  textStyles?: string, 
  isLoading?: boolean 
}

export type FormFieldType = {
  title?: string, 
  value?: string, 
  placeholder?: string, 
  handleChangeText?: any, 
  otherStyles?: string,
} & React.ComponentPropsWithoutRef<typeof TextInput>;

export type VideoCardType = {
  title?: string,
  thumbnail?: string,
  promt?: string,
  video: string,
  $id: string,
  creator: CreatorType
};

export type CreatorType = {
  username: string,
  avatar: string
}
