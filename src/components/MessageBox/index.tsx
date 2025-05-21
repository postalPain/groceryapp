import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import { Button } from '../ui/button';
import {
    Card,
    CardDescription,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';


type MessageBoxProps = {
    title: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
}
const MessageBox: React.FC<MessageBoxProps> = ({
    title,
    message,
    onCancel,
    onConfirm,
}) => {
    const { t } = useTranslation();
    useEffect(() => {
        const keyPressListener = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCancel();
            }
        };
        window.addEventListener('keydown', keyPressListener);

        return () => {
            window.removeEventListener('keydown', keyPressListener);
        }
    }, [onCancel]);

    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-primary opacity-60 transition-opacity animate-fade-out"
            />
            <div
                className="fixed inset-0 p-5 z-50 flex flex-col items-center justify-center"
            >
                <Card className="w-full sm:w-90">
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{message}</CardDescription>
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={onCancel}>{t('cancel')}</Button>
                        <Button onClick={onConfirm}>{t('confirm')}</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
};

export default MessageBox;
