import {
  Box,
  Flex,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Link as ReachLink, RouteComponentProps } from '@reach/router'
import React, { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import LoadingTableRows from './components/LoadingTableRows'
import db from './firebase'
import moment from 'moment'

interface DocList {
  docs: [{ docId: string }]
}

interface DocListProps extends RouteComponentProps {}

const DocumentList = (props: DocListProps) => {
  // const [paginateLimit, setpaginateLimit] = useState(15);
  const paginateLimit = 15
  const [paginatePage, setpaginatePage] = useState(0)

  const [value, loading, error] = useCollection(
    db.collection('documents').orderBy('timestamp', 'desc')
  )

  // const dataTop = docData.docs.slice(
  //   paginateLimit * paginatePage,
  //   paginateLimit * paginatePage + paginateLimit
  // )

  const handlePrev = () => {
    if (paginatePage > 0) setpaginatePage(paginatePage - 1)
  }

  const handleNext = () => {
    setpaginatePage(paginatePage + 1)
  }

  if (error) return <strong>Error: {JSON.stringify(error)}</strong>

  return (
    <Box px={{ base: 0, md: 6 }}>
      {/* <HStack fontSize="sm" divider={<StackDivider />}>
        <Text onClick={handlePrev}>
          <Link href="#">Prev</Link>
        </Text>
        <Text mx={4}>Page {paginatePage + 1}</Text>
        <Text onClick={handleNext}>
          <Link href="#">Next</Link>
        </Text>
      </HStack> */}
      <Box width="100%">
        <Table>
          <Thead>
            <Tr>
              <Th>Document ID</Th>
              <Th>Date Published</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading && <LoadingTableRows />}
            {value?.docs.map((doc: any) => {
              const { id, timestamp } = doc.data()
              return (
                <Tr key={id}>
                  <Td>
                    <Link as={ReachLink} to={`/document/${id}`} isTruncated color='orange.300'>
                      {id}
                    </Link>
                  </Td>
                  <Td>
                    {moment(timestamp).format('h:mm:ssA, MMMM Do YYYY') || '—'}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default DocumentList
