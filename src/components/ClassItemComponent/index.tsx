import {
  Box,
  Center,
  Divider,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ClassItem as ClassItemInterface } from "@/interfaces/classes";
import React, { memo } from "react";
import { classesMapped } from "../../../classes";

interface ClassItemProps {
  classItem: ClassItemInterface;
  style: any;
  status?: "blocked" | "free" | "taken";
  hasTakenPrerequisite?: boolean;
  seen?: any;
  hasRequiredHours?: boolean;
  onClick?(): void;
}

const ClassItemComponent = ({
  classItem,
  status,
  style,
  onClick,
  hasTakenPrerequisite,
  seen,
  hasRequiredHours,
  ...props
}: ClassItemProps) => {
  const toast = useToast();

  const handleClick = () => {
    if (status === "blocked") {
      let message = "";
      if (!hasTakenPrerequisite && classItem.requirementCode)
        message = `Pré-requisito não concluido: 
            ${classItem.requirementCode.split("/").map((item, index) => {
              if (seen[item]) return;
              if (index === 0) return classesMapped.values[item].name;
              return `${classesMapped.values[item].name}`;
            })}`;

      if (!hasRequiredHours) {
        message = `Necessário integralizar ${classItem.requiredHours} horas de curso`;
      }

      toast({
        title: "Matéria Bloqueada",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      if (onClick) onClick();
    }
  };

  return (
    <Flex
      direction="column"
      height={"100%"}
      min-height={"90px"}
      width={"100%"}
      bg="gray.700"
      borderRadius="5px"
      transition="ease 600ms"
      sx={style}
      onClick={handleClick}
    >
      <Text align="center" fontSize={"small"} p="5px 5px">
        {classItem.name}{" "}
      </Text>

      <Divider />

      <Flex p=" 0px 5px">
        <Text>{classItem.classHrs}</Text>
        <Spacer />
        <Text>{classItem.labHrs}</Text>
        <Spacer />
        <Text fontWeight="medium" color="red.700">
          {classItem.totalHrs}
        </Text>
      </Flex>
    </Flex>
  );
};

export default memo(ClassItemComponent);
