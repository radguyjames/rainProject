import {
    red,
    yellow
} from '@mui/material/colors';

/**
 * Provides color coding style sheet.
 * Resource: https://mui.com/customization/color/
 * @returns {{"& .priorityPassSeven": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, "& .urgencyPassOne": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, "& .priorityPassThree": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, "& .passSevenDays": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, "& .urgencyPassTwo": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, "& .priorityPassEight": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, "& .urgencyPassFour": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, "& .priorityPassTwo": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, "& .priorityPassFive": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, "& .priorityPassNine": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, "& .priorityPassSix": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, "& .priorityPassOne": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, width: number, "& .passThreeDays": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, "& .priorityPassFour": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, "& .priorityPassTen": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, "& .urgencyPassThree": {backgroundColor: string, "&:hover": {backgroundColor: string}, "&:focus-within": {backgroundColor: string}}, height: number}}
 */
const protocolStyle = () => {
    const style = {
        height: 300,
        width: 1,
        '& .passSevenDays': {
            backgroundColor: `${red[300]} !important`,
            '&:hover': {
                backgroundColor: `${red[400]} !important`,
            },
            '&:focus-within': {
                backgroundColor: `${red[500]} !important`,
            }},
        '& .passThreeDays': {
            backgroundColor: `${yellow[300]} !important`,
            '&:hover': {
                backgroundColor: `${yellow[400]} !important`,
            },
            '&:focus-within': {
                backgroundColor: `${yellow[500]} !important`,
            }
        },

        '& .priorityPassOne': {
            backgroundColor: 'rgba(255, 1, 0, 1)',
            '&:hover': {
                backgroundColor: 'rgba(255, 1, 0, 1)',
            },
            '&:focus-within': {
                backgroundColor: 'rgba(255, 1, 0, 1)',
            }
        },
        '& .priorityPassTwo': {
            backgroundColor: 'rgba(255, 72, 0, 1)',
            '&:hover': {
                backgroundColor: 'rgba(255, 72, 0, 1)',
            },
            '&:focus-within': {
                backgroundColor: 'rgba(255, 72, 0, 1)',
            }
        },
        '& .priorityPassThree': {
            backgroundColor: 'rgba(255, 121, 0, 1)',
            '&:hover': {
                backgroundColor: 'rgba(255, 121, 0, 1)',
            },
            '&:focus-within': {
                backgroundColor: 'rgba(255, 121, 0, 1)',
            }
        },
        '& .priorityPassFour': {
            backgroundColor: 'rgba(255, 168, 0, 1)',
            '&:hover': {
                backgroundColor: 'rgba(255, 168, 0, 1)',
            },
            '&:focus-within': {
                backgroundColor: 'rgba(255, 168, 0, 1)',
            }
        },
        '& .priorityPassFive': {
            backgroundColor: 'rgba(255, 214, 0, 1)',
            '&:hover': {
                backgroundColor: 'rgba(255, 214, 0, 1)',
            },
            '&:focus-within': {
                backgroundColor: 'rgba(255, 214, 0, 1)',
            }
        },
        '& .priorityPassSix': {
            backgroundColor: 'rgba(244, 238, 0, 1)',
            '&:hover': {
                backgroundColor: 'rgba(244, 238, 0, 1)',
            },
            '&:focus-within': {
                backgroundColor: 'rgba(244, 238, 0, 1)',
            }
        },
        '& .priorityPassSeven': {
            backgroundColor: 'rgba(191, 216, 0, 1)',
            '&:hover': {
                backgroundColor: 'rgba(191, 216, 0, 1)',
            },
            '&:focus-within': {
                backgroundColor: 'rgba(191, 216, 0, 1)',
            }
        },
        '& .priorityPassEight': {
            backgroundColor: 'rgba(146, 198, 0, 1)',
            '&:hover': {
                backgroundColor: 'rgba(146, 198, 0, 1)',
            },
            '&:focus-within': {
                backgroundColor: 'rgba(146, 198, 0, 1)',
            }
        },
        '& .priorityPassNine': {
            backgroundColor: 'rgba(97, 177, 0, 1)',
            '&:hover': {
                backgroundColor: 'rgba(97, 177, 0, 1)',
            },
            '&:focus-within': {
                backgroundColor: 'rgba(97, 177, 0, 1)',
            }
        },
        '& .priorityPassTen': {
            backgroundColor: 'rgba(31, 150, 0, 1)',
            '&:hover': {
                backgroundColor: 'rgba(31, 150, 0, 1)',
            },
            '&:focus-within': {
                backgroundColor: 'rgba(31, 150, 0, 1)',
            }
        },

        '& .urgencyPassOne': {
            backgroundColor: 'rgba(255, 1, 0, 1)',
            '&:hover': {
                backgroundColor: 'rgba(255, 1, 0, 1)',
            },
            '&:focus-within': {
                backgroundColor: 'rgba(255, 1, 0, 1)',
            }
        },
        '& .urgencyPassTwo': {
            backgroundColor: 'rgba(255, 121, 0, 1)',
            '&:hover': {
                backgroundColor: 'rgba(255, 121, 0, 1)',
            },
            '&:focus-within': {
                backgroundColor: 'rgba(255, 121, 0, 1)',
            }
        },
        '& .urgencyPassThree': {
            backgroundColor: 'rgba(244, 238, 0, 1)',
            '&:hover': {
                backgroundColor: 'rgba(244, 238, 0, 1)',
            },
            '&:focus-within': {
                backgroundColor: 'rgba(244, 238, 0, 1)',
            }
        },
        '& .urgencyPassFour': {
            backgroundColor: 'rgba(31, 150, 0, 1)',
            '&:hover': {
                backgroundColor: 'rgba(31, 150, 0, 1)',
            },
            '&:focus-within': {
                backgroundColor: 'rgba(31, 150, 0, 1)',
            }
        }
    }

    return style
}

export default protocolStyle;