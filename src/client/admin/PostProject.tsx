import * as React from 'react';
import { json } from '../utils/api';
import { RouteComponentProps, withRouter } from 'react-router';

export interface IPostProjectProps extends RouteComponentProps { }

export interface IPostProjectState {
    name: string;
    github_link: string;
    website: string;
}

class IPostProject extends React.Component<IPostProjectProps, IPostProjectState> {
    constructor(props: IPostProjectProps) {
        super(props);
        this.state = {
            name: null,
            github_link: null,
            website: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async componentWillMount() {
        // if(!User || User.userid === null || User.role !== 'admin') {
        //     this.props.history.replace('/login');
        // }
    }

    async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let project = {
            name: this.state.name,
            github_link: this.state.github_link,
            website: this.state.website,
        }

        try {

            let result = await json(`/api/projects`, 'POST', project);
            if (result) {
                this.setState({
                    name: '',
                    github_link: '',
                    website: '',
                })

                this.props.history.replace('/projects');
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {

        const { name, github_link, website } = this.state;

        return (
            <div className="row">
                <div className="col-md-12 fade-in">
                    <form onSubmit={(e) => this.handleSubmit(e)} className="form-group m-2 border border-info rounded p-2 bg-dark">
                        <label className="text-white">Name:</label>
                        <input
                            type="text"
                            value={undefined}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}
                            className="form-control d-block border border-info bg-secondary text-white">
                        </input>
                        <label className="text-white">Git Hub:</label>
                        <input
                            type="text"
                            value={undefined}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ github_link: e.target.value })}
                            className="form-control d-block border border-info bg-secondary text-white">
                        </input>
                        <label className="text-white">Website:</label>
                        <input
                            type="text text-white"
                            value={undefined}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ website: e.target.value })}
                            className="form-control d-block border border-info bg-secondary text-white">
                        </input>
                        <div className="d-flex">
                            <button className="btn btn-info mt-2">Post Project</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const Child = withRouter(IPostProject as any);
export default Child;