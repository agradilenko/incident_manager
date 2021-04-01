import styled from 'styled-components';

const DashBoardWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const DashBoardHeader = styled.div`
    width: 100%;
    height: 120px;
    border-bottom: 4px solid #fafafa;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const DashBoardContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 75px;
`;

const IncidentListContainer = styled.div`
    padding: 20px;
    border: 1px solid #e0e0e0;
`;

const LeftTopNav = styled.div`
    margin-left: 2rem;
    margin-top: 2rem;
    display: flex;
    align-items: center;
`;

const RightTopNav = styled.div`
    margin-right: 10rem;
    margin-top: 2rem;
    display: flex;
    align-items: center;
`;

const BrandHeader = styled.h1`
    margin-left: 2rem;
    font-weight: 500;
    font-family: 'Oxygen Mono', monospace;
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.5rem;
    user-select: none;
    color: #212121;
`;

const BrandHeaderSub = styled.span`
    margin-left: 1rem;
    font-size: 1rem;
`;

const LogoutButton = styled.button`
    height: 40px;
    margin-top: 1rem;
    color: #ffffff;
    background-color: #1652f0;
    border-color: #1652f0;
    border-radius: 4px;
    width: 100px;
    font-size: 16px;
    font-family: 'Oxygen Mono', monospace;
    transition: all 0.25s ease 0s;

    &:hover {
        background-color: #154de0;
        border-color: #154de0;
        transform: translateY(-2.5px);
        cursor: pointer;
        transition: all 0.25s ease 0s;
    }
`;

export {
    DashBoardWrapper,
    DashBoardHeader,
    DashBoardContentContainer,
    IncidentListContainer,
    LeftTopNav,
    BrandHeader,
    BrandHeaderSub,
    RightTopNav,
    LogoutButton
};
