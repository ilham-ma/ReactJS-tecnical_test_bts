import React from "react";
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

const Register = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      username: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^(?=.*\d).{5,}$/.test(value) ? null : "Invelid password",
    },
  });

  const handleSubmit = async (values) => {
    const { username, email, password } = values;
    try {
      const response = await axios.post(
        "/register",
        JSON.stringify({
          username,
          email,
          password,
        })
      );

      console.log(response);
      if (response.statusCode === 2000) {
        alert("registrasi berhasil");
        return navigate("/login");
      } else {
        alert("registrasi gagal");
      }
    } catch (error) {}
  };

  return (
    <Container>
      <Box sx={{ maxWidth: 350 }} mx="auto" mt="xl">
        <Title order={1} mb="xl">
          Register
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
            label="Email"
            type="email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
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
            sudah punya akun? <Link to="/login">login</Link>
          </Text>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
