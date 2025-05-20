import React from 'react'
import {ApiResponse} from "@/types/apiResponse"
import  {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {useEffect,useState} from "react"
import {useRouter} from "next/navigation"
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema';

export default function SignUpForm() {
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [ischeckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const debouncedUsername = useDebounce(username, 500);
    const router = useRouter();
    const { toast } = useToast();

    const from=userForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            
        },
    });
    useEffect(()=>{
        const checkUsernameUnique=async()=>{
            if(debouncedUsername){
                setIsCheckingUsername(true);
                setUsernameMessage("");
                try{
        const response=await axios.get<ApiResponse>(`/api/check-username-unique?username=${debouncedUsername}`
        );
        setUsernameMessage(response.data.message);
                }
                catch(error){
               const axiosError=error as AxiosError<ApiResponse>;
               setUsernameMessage(axiosError.response?.data.message || "An error occurred");
                }
                finally{
                    setIsCheckingUsername(false);
                }
            }
        }
        checkUsernameUnique();
    },[debouncedUsername]);


    const onSubmit=async(data: z.infer<typeof signUpSchema>)=>{
        setIsSubmitting(true);
        try{
            const response=await axios.post<ApiResponse>("/api/sign-up",data);
            toast({
                title: "Success",
                description: response.data.message,
            });
            router.replace(`/verify/${username}`);
            // setIsSubmitting(false);
        }
        catch(error){
            const axiosError=error as AxiosError<ApiResponse>;
            toast({
                title: "Error",
                description: axiosError.response?.data.message || "An error occurred",
                variant: "destructive",
            });
            // setIsSubmitting(false);
        }
        finally{
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    placeholder="Enter your username"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setUsername(e.target.value);
                                    }}
                                />
                                {ischeckingUsername && <Loader2 className="animate-spin" />}
                                {usernameMessage && <p>{usernameMessage}</p>}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <Input placeholder="Enter your email" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" placeholder="Enter your password" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}