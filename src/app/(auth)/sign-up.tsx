import { View, Image, ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@constants/images'
import FormField from '@components/common/FormField'
import { useState } from 'react'
import CustomButton from '@components/common/CustomButton'
import { Href, Link } from 'expo-router'

const SignUp = () => {
  const signIn = "/sign-in" as Href;
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {};

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full justify-center h-full px-4">
          <Image 
            source={images.logo} 
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
            Sign up to Aora
          </Text>
          <FormField
            title="User Name"
            value={form.userName}
            handleChangeText={(e: string) => setForm({...form, userName: e})}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({...form, email: e})}
            otherStyles="mt-10"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({...form, password: e})}
            otherStyles="mt-7"
          />
          <CustomButton
            label="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href={signIn}
              className="text-lg font-psemibold text-secondary"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp