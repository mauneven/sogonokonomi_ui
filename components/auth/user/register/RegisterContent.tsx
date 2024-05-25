import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Group,
  Text,
  PasswordInput,
  Popover,
  Stack,
  TextInput,
  Title,
  Select,
  Tooltip,
} from "@mantine/core";
import "@mantine/dates/styles.css";
import { IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import devEnvironment from "@/environments/devEnvironment";

interface RegisterContentProps {
  setIsLogin: (value: boolean) => void;
}

const RegisterContent: React.FC<RegisterContentProps> = ({ setIsLogin }) => {
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string | null>(null);
  const [dayData, setDayData] = useState<Array<string>>([]);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [tooltipMessage, setTooltipMessage] = useState<string>("");
  const [error, setError] = useState<{
    message: string;
    showButtons: boolean;
  } | null>(null);
  const router = useRouter();

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 120 }, (v, i) => `${currentYear - i}`);
  };

  const months = Array.from({ length: 12 }, (v, i) => `${i + 1}`);

  useEffect(() => {
    const daysInMonth =
      month && year
        ? new Date(parseInt(year), parseInt(month), 0).getDate()
        : 31;
    const daysArray = Array.from({ length: daysInMonth }, (v, i) => `${i + 1}`);
    setDayData(daysArray);

    if (day && (parseInt(day) > daysInMonth || parseInt(day) < 1)) {
      setDay(null);
    }
  }, [month, year, day]);

  const handleYearChange = (value: string | null) => {
    if (value !== null) {
      setYear(value);
      setDay(null);
    }
  };

  const handleMonthChange = (value: string | null) => {
    if (value !== null) {
      setMonth(value);
    }
  };

  const handleDayChange = (value: string | null) => {
    if (value !== null) {
      setDay(value);
    }
  };

  useEffect(() => {
    validateForm();
  }, [username, email, password, year, month, day]);

  const validatePassword = (password: string) => {
    return (
      password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password)
    );
  };

  const validateForm = () => {
    if (
      !username ||
      !email ||
      !password ||
      !validatePassword(password) ||
      !year ||
      !month ||
      !day
    ) {
      let message = "Please fill out all fields correctly.";
      if (!username) message = "Username is required.";
      else if (!email) message = "Email is required.";
      else if (!password) message = "Password is required.";
      else if (!validatePassword(password))
        message =
          "Password must contain at least 8 characters, 1 number, and 1 letter.";
      else if (!year) message = "Year is required.";
      else if (!month) message = "Month is required.";
      else if (!day) message = "Day is required.";

      setTooltipMessage(message);
      setIsButtonDisabled(true);
    } else {
      setTooltipMessage("");
      setIsButtonDisabled(false);
    }
  };

  const handleRegister = async () => {
    const user = {
      username,
      email,
      password,
      birthday: `${year}-${month.padStart(2, "0")}-${day?.padStart(2, "0")}`,
    };

    try {
      const response = await fetch(
        `${devEnvironment.api_backend}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer tokenseguro123",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        setIsLogin(true);
      } else {
        const data = await response.json().catch(() => ({ error: "0" }));
        handleRegistrationError(data.error);
      }
    } catch (error: any) {
      setError({
        message: "An error occurred. Please try again later.",
        showButtons: false,
      });
    }
  };

  const handleRegistrationError = (errorCode: string) => {
    switch (errorCode) {
      case "1":
        setError({
          message:
            "This username is already in use. Please write other.",
          showButtons: false,
        });
        break;
        case "2":
          setError({
            message:
              "This email is already registered. Please use a different email.",
            showButtons: true,
          });
          break;
      default:
        setError({
          message: "An unknown error occurred. Please try again later.",
          showButtons: false,
        });
    }
  };

  return (
    <Stack>
      <Title ta={"center"}>Create new Account</Title>
      {error && (
        <Alert
          variant="outline"
          color="red"
          title="Registration Error"
          icon={<IconAlertCircle size={16} />}
          withCloseButton
          onClose={() => setError(null)}
        >
          {error.message}
          {error.showButtons && (
            <Group mt="sm">
              <Button
                variant="light"
                color="blue"
                onClick={() => setIsLogin(true)}
              >
                Go Back To Login
              </Button>
              <Button
                variant="light"
                color="blue"
                onClick={() => router.push("/Recovery")}
              >
                Password Recovery
              </Button>
            </Group>
          )}
        </Alert>
      )}
      <TextInput
        label="Username"
        placeholder="@Username"
        withAsterisk
        value={username}
        onChange={(event) => setUsername(event.currentTarget.value)}
      />
      <TextInput
        label="Email"
        placeholder="Email"
        withAsterisk
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <Popover width={200} position="top" withArrow shadow="md">
        <Popover.Target>
          <PasswordInput
            label="Password"
            placeholder="Secure password"
            withAsterisk
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <Text size="xs">
            Your password needs to contain at least: 8 characters, 1 number, and
            1 letter
          </Text>
        </Popover.Dropdown>
      </Popover>
      <Stack gap={0}>
        <Text fw={500} size="md" pb={0} mb={0}>
          BirthDay
        </Text>
        <Group justify="space-between">
          <Select
            maw={120}
            label="Year"
            placeholder="Pick a year"
            data={getYears()}
            value={year}
            onChange={(value) => handleYearChange(value)}
            withAsterisk
          />
          <Select
            maw={120}
            label="Month"
            placeholder="Pick a month"
            data={months.map((month) => ({
              value: month,
              label: new Date(0, parseInt(month) - 1).toLocaleString(
                "default",
                {
                  month: "long",
                }
              ),
            }))}
            value={month}
            onChange={(value) => handleMonthChange(value)}
            withAsterisk
          />
          <Select
            maw={120}
            label="Day"
            placeholder="Pick a day"
            data={dayData}
            value={day}
            onChange={(value) => handleDayChange(value)}
            withAsterisk
          />
        </Group>
      </Stack>
      <Group grow>
        <Button onClick={() => setIsLogin(true)} variant="light" color="grey">
          Go back to Login
        </Button>
        <Tooltip label={tooltipMessage} disabled={!isButtonDisabled}>
          <div>
            <Button
              leftSection={<IconCheck />}
              disabled={isButtonDisabled}
              onClick={handleRegister}
            >
              Create Account
            </Button>
          </div>
        </Tooltip>
      </Group>
    </Stack>
  );
};

export default RegisterContent;
