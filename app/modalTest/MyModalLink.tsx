import Link from 'next/link';

 const MyModalLink = ({ isOpen, targetRoute, modalStateRoute, handleOpenModal, handleCloseModal }: any) => {

  return (
    <>
    <Link href={targetRoute} as={modalStateRoute} className='flex flex-col gap-5'>
      <button className='text-white' onClick={handleOpenModal}>{isOpen ? 'Show Modal (modal route)' : 'Hide Modal (main route)'}</button>
    </Link>
      <button className='text-white' onClick={handleCloseModal}>{isOpen ? 'Show Modal' : 'Hide Modal'}</button>
    </>
  );
};

export default MyModalLink
