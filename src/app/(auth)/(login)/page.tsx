'use client'

import * as React from "react";
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";

import { useToast } from "@/components/ui/use-toast";
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
import { useSearchParams, useRouter } from "next/navigation";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.username,
        password: data.password,
        redirect: false,
        callbackUrl
      });
      if (!result?.error) {
        router.push(callbackUrl);
      } else {
        toast({
          variant: "destructive",
          title: "Credenciais incorretas!",
          description: "Reveja seu email e senha.",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Algo deu errado!",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-span-1 flex items-center justify-center">
      <Toaster />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
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
                  {...register("username", { required: true })}
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
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Senha
                </Label>
                <Input
                  id="password"
                  {...register("password", { required: true })}
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
                {errors.password && (
                  <span className="px-2 text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              <Button disabled={isLoading}>
                {isLoading ? <Loader className="animate-spin" /> : "Acessar"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href="/forgot"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            Esqueceu sua senha
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
