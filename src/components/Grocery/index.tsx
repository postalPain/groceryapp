import React, {useEffect} from 'react';
import './style.css';
import type {IGrocery} from '../../services/api/types.ts';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Card, CardHeader, CardContent, CardFooter, CardTitle} from '../ui/card';
import {Separator} from '../ui/separator.tsx';
import {Input} from '../ui/input.tsx';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '../ui/select.tsx';
import {Checkbox} from '../ui/checkbox.tsx';
import {Button} from '../ui/button.tsx';
import {useTranslation} from 'react-i18next';


const formSchema = z.object({
    id: z.string(),
    name: z.string().nonempty(),
    amount: z.coerce.number().positive(),
    amountType: z.enum(['kg', 'l', 'unit']),
    bought: z.boolean(),
});

type GroceryProps = {
    initData?: Partial<IGrocery>;
    onClose: () => void;
    onSubmit: (data: IGrocery) => void;
}

const Grocery: React.FC<GroceryProps> = ({
    initData,
    onClose,
    onSubmit,
}) => {
    const { t } = useTranslation();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bought: false,
            amount: 1,
            amountType: 'kg',
            ...initData,
        },
    });

    const onFormSubmit = (data: IGrocery) => {
        onSubmit(data);
    };

    useEffect(() => {
        const keyPressListener = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', keyPressListener);

        return () => {
            window.removeEventListener('keydown', keyPressListener);
        }
    }, [onClose]);


    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-primary opacity-60 transition-opacity animate-fade-out"
            />
            <div
                className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            >
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>{t('grocery_edit_title')}</CardTitle>
                    </CardHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onFormSubmit)}
                            className="space-y-8"
                        >
                            <CardContent>
                                <FormField
                                    name="id"
                                    render={({field}) => (
                                        <Input {...field} type="hidden"/>
                                    )}
                                />
                                <div className="mb-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{t('grocery_form_name')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={t('grocery_form_name_placeholder')}
                                                        autoFocus
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex space-x-5 mb-8">
                                    <div className="flex-1">
                                        <FormField
                                            control={form.control}
                                            name="amount"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>{t('grocery_form_amount')}</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="amountType"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>&nbsp;</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder={t('grocery_form_amount_type_placeholder')}/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem
                                                            value="kg">{t('grocery_form_amount_type_kg')}</SelectItem>
                                                        <SelectItem value="l">{t('grocery_form_amount_type_l')}</SelectItem>
                                                        <SelectItem
                                                            value="unit">{t('grocery_form_amount_type_units')}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mb-4">
                                    <FormField
                                        control={form.control}
                                        name="bought"
                                        render={({field}) => (
                                            <FormItem
                                                className="flex flex-row items-center space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="leading-none">
                                                    <FormLabel>
                                                        {t('grocery_form_bought_checkbox')}
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                            <div className="px-6 mb-4">
                                <Separator className="mb-0"/>
                            </div>
                            <CardFooter className="flex justify-between">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onClose}
                                >
                                    {t('cancel')}
                                </Button>
                                <Button
                                    type="submit"
                                >
                                    {t('save')}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </div>
        </>
    )
};

export default Grocery;
