import { BackAppBar } from '@/components/ui/appbars/BackAppBar';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { PhoneCallIcon, WhatsappLogoIcon } from 'phosphor-react-native';
import AppAlert from '@/components/ui/AppAlert';
import serviceCardData from '@/constants/serviceCardData';

const Service = () => {
    const { title } = useLocalSearchParams<{ title: string }>();
    const card = serviceCardData.find(c => c.title === title);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    if (!card) {
        return (
            <View className="flex-1 items-center justify-center bg-background-950">
                <Text className="text-white text-lg">Service not found</Text>
            </View>
        );
    }

    const Icon = card.icon;
    const phoneNumber = card.phoneNumber;
    const whatsappMessage = card.customWhatsAppMessage || `Hello, I am interested in ${card.title}`;

    const openWhatsApp = async () => {
        const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
            whatsappMessage
        )}`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            Linking.openURL(url);
        } else {
            setAlertMessage("WhatsApp is not installed on this device.");
            setAlertVisible(true);
        }
    };

    const openPhoneDialer = async () => {
        const url = `tel:${phoneNumber}`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            Linking.openURL(url);
        } else {
            setAlertMessage("Cannot open the phone dialer.");
            setAlertVisible(true);
        }
    };
    return (
        <View className="flex-1 bg-background-950">
            <BackAppBar title={title} />

            <View className="flex-1 items-center gap-4">
                <View className="h-[100px] w-full bg-accent-600 items-center pt-[20px]">
                    <View
                        className="items-center justify-center"
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 6,
                            elevation: 20,
                        }}
                    >
                        <Icon size={64} weight="fill" color="#fff" />
                    </View>
                    <Text
                        className="text-text-50 text-[28px] font-Poppins_700Bold font-extrabold text-center"
                        style={{
                            position: 'absolute',
                            top: 78,
                            width: 250,
                            height: 68,
                            left: '50%',
                            marginLeft: -125,
                        }}
                    >
                        {card.title}
                    </Text>
                </View>

                <Text className="mt-[32px] text-text-50 w-[370px] h-auto text-base text-center text-[16px] font-medium font-poppins">
                    {card.text1}
                </Text>
                <Text className="mt-[16px] text-textSecondary w-[370px] h-auto text-base text-center">
                    {card.text2}
                </Text>


                <View className="flex-row justify-center mt-6">
                    <TouchableOpacity
                        className="w-[177px] h-[44px] flex-row items-center justify-center bg-success rounded-full mr-4"
                        onPress={openWhatsApp}
                    >
                        <WhatsappLogoIcon size={22} weight="fill" color="#fff" />
                        <Text className="text-white text-base font-medium ml-2">WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="w-[177px] h-[44px] flex-row items-center justify-center bg-primary-500 rounded-full"
                        onPress={openPhoneDialer}
                    >
                        <PhoneCallIcon size={22} weight="fill" color="#fff" />
                        <Text className="text-white text-base font-medium ml-2">Phone</Text>
                    </TouchableOpacity>
                </View>


            </View>

            <AppAlert
                visible={alertVisible}
                type="dialog"
                message={alertMessage}
                onPrimary={() => setAlertVisible(false)}
            />
        </View>
    );
};

export default Service;
