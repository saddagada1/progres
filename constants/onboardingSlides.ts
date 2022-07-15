import { ImageProps } from "react-native";

export interface onboardingSlide extends Pick<ImageProps, 'source'> {
    id: string
    title: string
    description: string
}

export const onboardingSlides: onboardingSlide[] = [
    {
        id: '1',
        title: 'Welcome to Progres',
        description: 'Your personalized assistant for your educational journey.',
        source: require('../assets/images/education.png')
    },
    {
        id: '2',
        title: 'Stay Organized',
        description: 'Keep track of every assignment, lab or exam, accross all of your courses.',
        source: require('../assets/images/notebook.png')
    },
    {
        id: '3',
        title: 'Stay Motivated',
        description: 'Set goals and reminders to achieve the grades you want.',
        source: require('../assets/images/studying.png')
    },
    {
        id: '4',
        title: 'See Results',
        description: 'Stay on top of school and pave your path to success.',
        source: require('../assets/images/results.png')
    }
]