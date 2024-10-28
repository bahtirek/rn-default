import { View, Image, ScrollView, Text, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@constants/images'
import FormField from '@components/common/FormField'
import { useState } from 'react'
import CustomButton from '@components/common/CustomButton'
import { Href, Link, router } from 'expo-router'
import { signIn } from 'lib/appwrite'

const SigIn = () => {
  const signUp = "/sign-up" as Href;
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    if(!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields!');
      return;
    }
    setSubmitting(true);

    try {
      const result = await signIn(form.email, form.password);
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setSubmitting(false)
    }
  };

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
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({...form, password: e})}
            otherStyles="mt-7"
          />
          <CustomButton
            label="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href={signUp}
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SigIn