"use client";

import * as React from "react";
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";

import { cn } from "@/lib/utils";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 as Loader } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Inputs = {
  username: string;
  password: string;
};

export default function Forgot() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      toast({
        variant: "success",
        title: "Pronto!",
        description: "Enviamos um e-mail com as instruções.",
        action: (
          <ToastAction altText="Try again">
            <Link href={"/"}>Página inicial</Link>
          </ToastAction>
        ),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    // const result = await signIn("credentials", {
    //   username: data.username,
    //   password: data.password,
    //   redirect: false,
    // });

    // if (result?.error) {
    //   console.error(result);
    //   setIsLoading(false);
    //   toast({
    //     variant: "destructive",
    //     title: "Algo deu errado!",
    //     description: "There was a problem with your request.",
    //     action: <ToastAction altText="Try again">Try again</ToastAction>,
    //   });
    //   return;
    // }
  };

  return (
    <div className="col-span-1 flex items-center justify-center">
      <Toaster />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Esqueceu sua senha</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  {...register("username")}
                  placeholder="User"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
                {errors.username && (
                  <span className="px-2 text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              <Button disabled={isLoading}>
                {isLoading ? <Loader /> : "Enviar"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            Voltar
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
