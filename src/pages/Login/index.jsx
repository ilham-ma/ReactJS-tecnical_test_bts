import React, { useEffect } from "react";
import {
  TextInput,
  Container,
  Button,
  Group,
  Box,
  Title,
  Space,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token"]);

  const form = useForm({
    initialValues: {
      password: "",
      username: "",
      termsOfService: false,
    },

    validate: {
      password: (value) =>
        /^(?=.*\d).{5,}$/.test(value) ? null : "Invelid password",
    },
  });

  const handleSubmit = async (values) => {
    const { username, password } = values;
    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({
          username,
          password,
        })
      );
      if (response.status === 200) {
        const token = response.data.data.token;
        setCookies("token", token);
        return navigate("/home", { replace: true });
      }
    } catch (error) {
      if (error) return alert("username dan password tidak terdaftar");
    }
  };

  return (
    <Container>
      <Box sx={{ maxWidth: 350 }} mx="auto" mt="xl">
        <Title order={1} mb="xl">
          Login
        </Title>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            required
            label="Username"
            placeholder="Asep#123"
            {...form.getInputProps("username")}
          />
          <Space h="md" />
          <TextInput
            required
            label="Password"
            type="password"
            placeholder="min 8 character"
            {...form.getInputProps("password")}
          />

          <Group position="center" mt="xl" grow>
            <Button type="submit">Submit</Button>
          </Group>
          <Text size="sm" mt="xs" align="center">
            belum punya akun? <Link to="/register">register</Link>
          </Text>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
