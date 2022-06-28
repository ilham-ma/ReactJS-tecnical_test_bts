import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Container,
  Title,
  TextInput,
  Group,
  Button,
  Card,
  Text,
  Space,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

const Home = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [checklist, setChecklist] = useState([]);
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [checklistIdShow, setChecklistShow] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.token === undefined) {
      return navigate("/login", { replace: true });
    } else {
      handleGetAllChecklist();
    }
  }, [checklist]);

  const formChecklist = useForm({
    initialValues: {
      checklist: "",
      termsOfService: false,
    },
  });

  const formItems = useForm({
    initialValues: {
      items: "",
      termsOfService: false,
    },
  });

  const handleGetAllChecklist = async () => {
    try {
      const response = await axios.get("/checklist", {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      setChecklist(response.data.data);
    } catch (error) {}
  };

  const handleRemoveChecklist = async (checklistId) => {
    try {
      await axios.delete(`/checklist/${checklistId}`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
    } catch (error) {
      alert("ada error");
    }
  };

  const handleNewChecklist = async (values) => {
    try {
      await axios.post(
        "/checklist",
        JSON.stringify({
          name: values.checklist,
        }),
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
    } catch (error) {
      alert("ada error");
    }
  };

  const handleOpenedModal = (checklistId) => {
    handleGetItem(checklistId);
    setChecklistShow(checklistId);
    setOpened(true);
  };

  const handleGetItem = async (checklistId) => {
    try {
      const response = await axios.get(`/checklist/${checklistId}/item`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
    } catch (error) {}
  };

  const handleNewItems = async (values) => {
    try {
      const response = await axios.post(
        `/checklist/${checklistIdShow}/item`,
        JSON.stringify({
          itemName: values.items,
        }),
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
      console.log(response);
    } catch (error) {}
  };
  return (
    <Container>
      <Title>Daftar checklist</Title>
      <form
        onSubmit={formChecklist.onSubmit((values) =>
          handleNewChecklist(values)
        )}
      >
        <Group>
          <TextInput
            required
            label="Checklist Baru"
            {...formChecklist.getInputProps("checklist")}
          />

          <Button type="submit">Tambah</Button>
        </Group>
      </form>
      <Space h="xl" />
      {checklist.map((item, index) => (
        <Card shadow="sm" key={index} mb="md">
          <Group position="apart">
            <Text>{item.name}</Text>
            <Group>
              <Button onClick={() => handleOpenedModal(item.id)}>Detail</Button>
              <Button
                color="red"
                onClick={() => handleRemoveChecklist(item.id)}
              >
                Hapus
              </Button>
            </Group>
          </Group>
        </Card>
      ))}

      <Modal opened={opened} onClose={() => setOpened(false)}>
        <form onSubmit={formItems.onSubmit((values) => handleNewItems(values))}>
          <Group>
            <TextInput
              required
              label="Item Baru"
              {...formItems.getInputProps("item")}
            />

            <Button type="submit">Tambah item</Button>
          </Group>
        </form>
        {items.map((item, index) => (
          <Card key={index}>{item}</Card>
        ))}
      </Modal>
    </Container>
  );
};

export default Home;
