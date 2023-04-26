import { TeamTable } from "../components/TeamTable/Table";
import { Section } from "../components/Section/Section";
import { sectionFourTitle, sectionFourContent } from "../services/pageData";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamData } from "../reducers/table";
import { CustomAlert } from "../components/Alert/CustomAlert";
import { useEffect } from "react";
import { ConfirmationModal } from "../components/Modal/ConfirmationModal";
import { toggleModal } from "../reducers/modal";
import { FeaturedImage } from "../components/FeaturedImage/FeaturedImage";
import { AlertState, TableState } from "../types";
import { AppDispatch } from "../app/store";

export const Teams: React.FC = () => {
  document.title = "MTB Teams";
  const table = useSelector((state: any) => state.table) as TableState;
  const dispatch = useDispatch<AppDispatch>();
  const tableData = JSON.parse(JSON.stringify(table.value.data));
  const alertData = useSelector((state: AlertState) => state.alert);
  const modalData = useSelector((state: any) => state.modal);

  useEffect(() => {
    dispatch(fetchTeamData())
  }, [dispatch]);

  return (
    <>
      <FeaturedImage src={'https://img.redbull.com/images/c_crop,x_0,y_0,h_4644,w_8256/c_fill,w_1820,h_1071/q_auto:low,f_auto/redbullcom/2022/6/21/fc9itii98dyr4imm5z1a/crankworx-stop-1-innsbruck-full-recap-program-szymon-godziek'} alt={'bike-race'} />

      <h1 className="text-dark my-4 py-4 text-center">Teams</h1>

      <div className="mb-5 pb-2">
      <ConfirmationModal
        show={modalData.value.showModal}
        onHide={() => dispatch(toggleModal(false))} />

        <TeamTable options={table.value.app} data={tableData} />
        <a
          className="btn btn-secondary text-white"
          href="/Create"
          style={{ width: "100%" }}
        >
          Add new team
        </a>

        {alertData.value.showAlert ? <CustomAlert /> : null}
      </div>

      <Section
        className="mt-5"
        title={sectionFourTitle}
        content={sectionFourContent}
        counter={"00"}
        bg={"gray"}
        showAside={false}
      />
    </>
  );
};

