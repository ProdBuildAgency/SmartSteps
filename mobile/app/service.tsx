import { BackAppBar } from '@/components/ui/appbars/BackAppBar';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import {
    ChalkboardTeacherIcon,
    TrendUpIcon,
    SecurityCameraIcon,
    CalendarCheckIcon,
    BooksIcon,
    HeadsetIcon,
    PhoneCallIcon,
    WhatsappLogoIcon
} from 'phosphor-react-native';
import AppAlert from '@/components/ui/AppAlert';

const cardData = [
    {
        title: "Smart Training",
        text1: "Empower your preschool staff with guided training designed for early childhood education. Improve teaching quality, classroom handling, and overall learning experience.",
        text2: "To get access to Smart Training, reach us through WhatsApp or a direct call. We’re happy to assist you.",
        customWhatsAppMessage: "",
        icon: ChalkboardTeacherIcon,
        phoneNumber: "+918658725415"
    },
    {
        title: "Smart Branding & Marketing",
        text1: "Strengthen your preschool’s identity with professional branding and promotional support. From design to marketing strategy, we help you build trust and visibility.",
        text2: "To unlock Branding & Marketing services, connect with us via WhatsApp or call. Our team will guide you ahead.",
        customWhatsAppMessage: "",
        icon: TrendUpIcon,
        phoneNumber: "+918658725415"
    },
    {
        title: "Smart CCTV Provision",
        text1: "Keep your preschool safe with reliable CCTV   installation & monitoring solutions. Ensure transparency, security, and peace of mind for parents and staff.",
        text2: "To enable CCTV Provision services, simply reach out to us on WhatsApp or call. We’ll assist you with the setup.",
        customWhatsAppMessage: "",
        icon: SecurityCameraIcon,
        phoneNumber: "+918658725415"
    },
    {
        title: "Preschool Event Support",
        text1: "Get complete help in planning, organizing, and managing your preschool events. Make celebrations smooth, memorable, and stress-free.",
        text2: "To access Events Support services, contact us anytime through WhatsApp or phone. We’re ready to help.",
        customWhatsAppMessage: "",
        icon: CalendarCheckIcon,
        phoneNumber: "+918658725415"
    },
    {
        title: "Personalized Stationary",
        text1: "Enhance your preschool’s identity with custom-designed stationary. From notebooks to name tags, each item can reflect your school’s branding and child-friendly designs.",
        text2: "To order Personalized Stationary, share your school details and preferences with us via WhatsApp or call. We’ll create the perfect set for your preschool.",
        customWhatsAppMessage: "",
        icon: BooksIcon,
        phoneNumber: "+918658725415"
    },

    {
        title: "Customer Support",
        text1: "Need help with modules, purchases, or your preschool account? Our support team is always available for quick assistance.",
        text2: "You can message us on WhatsApp or call directly—our team will respond immediately.",
        customWhatsAppMessage: "",
        icon: HeadsetIcon,
        phoneNumber: "+918658725415"
    },
];

const Service = () => {
    const { title } = useLocalSearchParams<{ title: string }>();
    const card = cardData.find(c => c.title === title);

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
