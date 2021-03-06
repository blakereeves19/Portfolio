import * as React from 'react';
import { json } from '../utils/api';
import { Link } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';

export interface IViewProjectsProps extends RouteComponentProps<{ id: string }> { }

export interface IViewProjectsState {
    projects: Array<{ id: number, name: string, github_link: string, website: string }>
}

class IViewProjects extends React.Component<IViewProjectsProps, IViewProjectsState> {
    constructor(props: IViewProjectsProps) {
        super(props);

        this.state = { projects: [] };
    }

    async componentDidMount() {
        try {
            let projects = await json('/api/projects');
            this.setState({ projects });
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.projects.map(project => {
                        return(
                        <div className="container fade-in">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card m-2 border border-info bg-dark">
                                        <div className="card-body">
                                            <div className="card-title text-white font-weight-bold border border-info border-top-0 border-left-0 border-right-0">{project.name}</div>
                                            <div className="text text-white">Git Hub: <a href={project.github_link} target="_blank" rel="noopener noreferrer">{project.github_link}</a></div>
                                            <div className="text text-white">Website: <a href={project.website} target="_blank" rel="noopener noreferrer">{project.website}</a></div>
                                            <Link to={`/projects/${project.id}/update`} className="btn btn-info mt-2">Edit</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        );
    }
}

const Child = withRouter(IViewProjects as any);
export default Child;