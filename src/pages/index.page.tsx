import type { NextPage } from "next";
import Head from "next/head";
import classesArray, { specialRequiredActivities } from "../../classes";
import SemesterColumn, { style } from "@/components/semesterColumn";
import { useProfile } from "context/Profile";
import NavBar from "@/components/Nav";
import { ClassItem } from "@/interfaces/classes";
import { Center, Divider, Flex, HStack, VStack } from "@chakra-ui/react";
import ClassItemComponent from "@/components/ClassItemComponent";
import ComplementaryActivitiesItem from "@/components/ComplementaryActivitiesItem";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const { updateInternshipStatus, isRequiredInternshipTaken, hoursCompleted } =
    useProfile();

  const internshipStatus = isRequiredInternshipTaken
    ? "taken"
    : specialRequiredActivities.requiredInternship.requiredHours >
      hoursCompleted
    ? "blocked"
    : "free";

  return (
    <Flex direction="column" w="100%" h="100%" minH="100vh" align="center">
      <Head>
        <title>Fluxograma Mecatrônica</title>
        <meta
          name="description"
          content="Aplicativo para auxiliar na escolha de matérias do curso de Engenharia Mecatrônica da Universidade Federal de Uberlândia (UFU) utilizando o fluxograma oficial do curso."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />

      <Flex w="100%" p="0 20px" maxW="1300px" direction="column">
        <HStack>
          {classesArray.map((item: ClassItem[], index) => {
            return <SemesterColumn key={index} semesterClasses={item} />;
          })}
        </HStack>

        <Divider p="10px 0px" />

        <HStack justify="center" p="10px">
          <VStack>
            <ClassItemComponent
              classItem={specialRequiredActivities.requiredInternship}
              style={style[internshipStatus]}
              onClick={
                internshipStatus !== "blocked"
                  ? updateInternshipStatus
                  : () => {}
              }
            />
          </VStack>
          <ComplementaryActivitiesItem
            classItem={
              specialRequiredActivities.complementaryAcademicActivities
            }
          />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Home;
